import {render, screen, fireEvent } from '@testing-library/react';
import { MedicoForm } from '../../components/MedicoForm';
import {faker} from '@faker-js/faker';

beforeEach(() => {
    window.alert = vi.fn();
  });

const nascimento = faker.date.between({
    from: '1965-01-01',
    to: '2000-01-01',
  });
  
const nascimentoFormatado = nascimento.toISOString().split('T')[0];

test('envia formulário com dados aleatórios', async () => {
    render(<MedicoForm />);

   fireEvent.change(screen.getByPlaceholderText('Nome completo'), {
    target: {value: faker.person.fullName()},
   });

   fireEvent.change(screen.getByPlaceholderText('Especialidade'), {
    target:{value: 'Cardiologia'},
   });

   fireEvent.change(screen.getByPlaceholderText('CRM'), {
    target: {value: '12345'},
   });

   fireEvent.change(screen.getByPlaceholderText('E-mail'), {
    target: {value: faker.internet.email()},
   });

   fireEvent.change(screen.getByPlaceholderText('Telefone'), {
    target: {value: faker.phone.number()},
   });

   fireEvent.change(screen.getByPlaceholderText('CPF (opcional)'), {
    target: {value: '00798943456'},
   });
   
   fireEvent.change(screen.getByLabelText('Data de nascimento'), {
    target: { value: nascimentoFormatado },
  });

   fireEvent.change(screen.getByPlaceholderText('CEP'), {
    target: {value: '90010350'},
   });
   
   fireEvent.change(screen.getByPlaceholderText('Complemento'), {
    target: {value: ''},
   });

   fireEvent.change(screen.getByPlaceholderText('Número'), {
    target: {value: '128883'},
   });


   fireEvent.click(screen.getByText('Cadastrar'));
});

