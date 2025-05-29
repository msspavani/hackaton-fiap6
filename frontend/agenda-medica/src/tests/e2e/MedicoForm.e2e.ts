import { test, expect } from '@playwright/test';

test('Preenche e envia formulário com dados fake', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await page.fill('input[name="nome"]', 'Dr. João da Silva');
  await page.fill('input[name="especialidade"]', 'Pediatria');
  await page.fill('input[name="crm"]', '998877');
  await page.fill('input[name="email"]', 'joao@exemplo.com');
  await page.fill('input[name="telefone"]', '(56)988823487');
  await page.fill('input[name="cpf"]', '09876547873');
  await page.fill('input[name="nascimento"]', '1982-02-02');
  await page.fill('input[name="cep"]', '90010350');
  await page.fill('input[name="complemento"]', '');
  await page.fill('input[name="rua"]', 'rua dos bobos');
  await page.fill('input[name="bairro"]', 'bairro teste');
  await page.fill('input[name="cidade"]', 'cidade teste');
  await page.fill('input[name="estado"]', 'de calamidade');
  await page.fill('input[name="numero"]', '9898888');

  // ...


  await Promise.all([
    page.waitForEvent('dialog').then(async dialog => {
      expect(dialog.message()).toBe('Médico cadastrado com sucesso!');
      await dialog.accept();
    }),
    page.click('text=Cadastrar')
  ]);

});