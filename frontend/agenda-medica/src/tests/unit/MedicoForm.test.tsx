import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import { MedicoForm } from '../../pages/MedicoForm';

beforeEach(() => {
  window.alert = vi.fn();
});

test('envia formulário com dados aleatórios', async () => {
  const routes = [
    {
      path: '/',
      element: <MedicoForm />
    },
    {
      path: '/definir-senha',
      element: <div>Senha definida</div>
    }
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
  });

  render(<RouterProvider router={router} />);

  fireEvent.change(screen.getByPlaceholderText('Nome completo'), {
    target: { value: faker.person.fullName() }
  });

  fireEvent.change(screen.getByPlaceholderText('Especialidade'), {
    target: { value: 'Cardiologia' }
  });

  fireEvent.change(screen.getByPlaceholderText('CRM'), {
    target: { value: '12345' }
  });

  fireEvent.change(screen.getByPlaceholderText('E-mail'), {
    target: { value: faker.internet.email() }
  });

  fireEvent.change(screen.getByPlaceholderText('Telefone'), {
    target: { value: faker.phone.number() }
  });

  fireEvent.change(screen.getByPlaceholderText('CPF (opcional)'), {
    target: { value: '00798943456' }
  });

  fireEvent.change(screen.getByLabelText('Data de nascimento'), {
    target: { value: '1990-01-01' }
  });

  fireEvent.change(screen.getByPlaceholderText('CEP'), {
    target: { value: '90010350' }
  });

  fireEvent.change(screen.getByPlaceholderText('Complemento'), {
    target: { value: 'Bloco B' }
  });

  fireEvent.change(screen.getByPlaceholderText('Número'), {
    target: { value: '128883' }
  });

  fireEvent.change(screen.getByPlaceholderText('Rua'), {
    target: { value: 'Rua Teste' }
  });

  fireEvent.change(screen.getByPlaceholderText('Bairro'), {
    target: { value: 'Centro' }
  });

  fireEvent.change(screen.getByPlaceholderText('Cidade'), {
    target: { value: 'Porto Alegre' }
  });

  fireEvent.change(screen.getByPlaceholderText('Estado'), {
    target: { value: 'RS' }
  });

  fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }));

  // assert opcional:
  // expect(await screen.findByText('Senha definida')).toBeInTheDocument();
});
