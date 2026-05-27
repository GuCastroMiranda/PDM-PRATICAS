const { z } = require('zod');

const categorySchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  displayName: z.string().min(1, "O nome de exibição é obrigatório"),
  icon: z.string().min(1, "O ícone é obrigatório"),
  background: z.string().min(1, "A cor de fundo é obrigatória"),
  isIncome: z.boolean().default(false),
});

const transactionSchema = z.object({
  description: z.string().min(1, "A descrição é obrigatória"),
  value: z.number().positive("O valor deve ser positivo"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida (YYYY-MM-DD)"),
  categoryId: z.number().int("ID da categoria inválido"),
});

module.exports = {
  categorySchema,
  transactionSchema,
};
