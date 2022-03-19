export class Validator {
	static msg = new Validator()

	REQUIRED = 'Campo obrigatório'

	MIN(value: number): string {
		return `Campo deve ter no mínimo ${value} caracteres`
	}
}
