import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/medicos', async ({ request }) => {
    const body = (await request.json()) as { crm?: string };
    if (!body.crm) {
      console.warn('⚠️ Campo CRM ausente no body da requisição:', body);
      return HttpResponse.json(
        { error: 'CRM ausente no corpo da requisição' },
        { status: 400 }
      );
    }

    return HttpResponse.json({
      crm: body.crm,
      token: 'mock-token'
    });
  })
];