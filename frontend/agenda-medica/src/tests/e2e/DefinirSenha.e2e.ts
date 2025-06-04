import {test, expect} from "@playwright/test";

test("Cadastro de senha com sucesso", async({page}) => {
    await page.goto("/definir-senha");

    await page.evaluate(() => {
        history.pushState({crm: "12345", token: "fake-token"}, "", location.href);
    });

    await page.locator('input[placeholder="Nova senha"]').fill("Senha123@");
    await page.locator('input[placeholder="Confirmar senha"]').fill("Senha123@");
    await page.getByRole("button", { name: "Salvar Senha" }).click();

    await expect(page).toHaveURL("/");
});