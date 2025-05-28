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
  await page.fill('input[name="endereco"]', 'rua dos bobos numero zero');
  // ...

  await page.click('text=Cadastrar');

  await expect(page.locator('text=Médico cadastrado com sucesso')).toBeVisible();
});