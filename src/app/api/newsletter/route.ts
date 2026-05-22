import { NextRequest, NextResponse } from 'next/server';

interface NewsletterPayload {
  email: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: NewsletterPayload = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'E-mail é obrigatório.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'E-mail inválido.' }, { status: 400 });
    }

    // TODO: substituir por integração oficial do RD Station Marketing
    // (envio para o formulário/identificador fornecido pelo Henrique).
    console.log('Nova inscrição na newsletter:', {
      email,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true, message: 'Inscrição registrada com sucesso.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao processar inscrição na newsletter:', error);
    return NextResponse.json(
      { error: 'Erro ao processar inscrição. Tente novamente.' },
      { status: 500 }
    );
  }
}
