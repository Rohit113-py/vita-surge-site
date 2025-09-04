import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationId, imageUrl } = await req.json();
    console.log('Received request:', { message, conversationId, imageUrl });

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Authorization header required');
    }

    // Verify the user token
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      console.error('Auth error:', authError);
      throw new Error('Invalid authentication token');
    }

    console.log('Authenticated user:', user.id);

    // Create system prompt for medical AI
    let systemPrompt = `You are a medical AI assistant designed to help analyze medical images and provide preliminary health insights. 

IMPORTANT DISCLAIMERS:
- You are NOT a replacement for professional medical diagnosis
- Always recommend consulting with qualified healthcare professionals
- Your analysis is for informational purposes only
- In case of emergencies, direct users to emergency services

CAPABILITIES:
- Analyze medical scans (X-rays, MRI, CT scans, lab reports)
- Identify potential abnormalities or areas of concern
- Provide educational information about medical conditions
- Suggest when urgent medical attention may be needed

RESPONSE FORMAT:
- Provide clear, structured analysis
- Use simple, understandable language
- Include confidence levels when appropriate
- Always end with medical disclaimer and professional consultation recommendation`;

    // Prepare messages for OpenAI
    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: message }
    ];

    // If there's an image, add it to the message
    if (imageUrl) {
      messages[1] = {
        role: 'user',
        content: [
          { type: 'text', text: message },
          { type: 'image_url', image_url: { url: imageUrl } }
        ]
      };
    }

    // Call OpenAI API
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: messages,
        max_tokens: 1500,
        temperature: 0.3,
      }),
    });

    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${openAIResponse.status}`);
    }

    const aiResponse = await openAIResponse.json();
    const assistantMessage = aiResponse.choices[0].message.content;

    console.log('AI Response generated successfully');

    // Save user message to database
    const { error: userMessageError } = await supabase
      .from('chat_messages')
      .insert({
        conversation_id: conversationId,
        role: 'user',
        content: message,
        image_url: imageUrl,
      });

    if (userMessageError) {
      console.error('Error saving user message:', userMessageError);
    }

    // Save assistant message to database
    const { error: assistantMessageError } = await supabase
      .from('chat_messages')
      .insert({
        conversation_id: conversationId,
        role: 'assistant',
        content: assistantMessage,
        analysis_result: imageUrl ? { analyzed_image: imageUrl } : null,
      });

    if (assistantMessageError) {
      console.error('Error saving assistant message:', assistantMessageError);
    }

    return new Response(
      JSON.stringify({ 
        response: assistantMessage,
        conversationId: conversationId 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in medical-chat function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An unexpected error occurred',
        details: 'Please ensure you have uploaded a valid medical image and try again.'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});