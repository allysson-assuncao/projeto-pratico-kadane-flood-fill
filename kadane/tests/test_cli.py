"""Testes unitários e de integração para a interface de linha de comando (CLI) do Kadane."""

import pytest
from kadane.src.cli import (
    build_parser,
    format_array_slice,
    format_comparison,
    main,
    parse_array_arg,
)


class TestParseArrayArg:
    """Valida o parser de argumentos de entrada para vetores."""

    def test_parse_json_style(self):
        result = parse_array_arg("[-2, 1, -3, 4, -1, 2, 1, -5, 4]")
        assert result == [-2, 1, -3, 4, -1, 2, 1, -5, 4]

    def test_parse_comma_separated(self):
        result = parse_array_arg("10, -5, 20, -1")
        assert result == [10, -5, 20, -1]

    def test_parse_space_separated(self):
        result = parse_array_arg("3 -2 5 -1")
        assert result == [3, -2, 5, -1]

    def test_parse_single_element(self):
        assert parse_array_arg("42") == [42]
        assert parse_array_arg("[42]") == [42]

    def test_parse_all_negative(self):
        assert parse_array_arg("[-10, -3, -5]") == [-10, -3, -5]

    def test_parse_empty_string_raises_value_error(self):
        with pytest.raises(ValueError, match="não pode ser vazio"):
            parse_array_arg("")

    def test_parse_empty_brackets_raises_value_error(self):
        with pytest.raises(ValueError, match="não pode ser vazio"):
            parse_array_arg("[]")

    def test_parse_invalid_character_raises_value_error(self):
        with pytest.raises(ValueError, match="Elemento inválido 'abc'"):
            parse_array_arg("[1, 2, abc, 4]")


class TestFormatters:
    """Valida funções de formatação e comparação."""

    def test_format_array_slice(self):
        formatted = format_array_slice([10, 20, 30], 1, 2)
        assert "10" in formatted
        assert "20" in formatted
        assert "30" in formatted

    def test_format_comparison_output(self):
        arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
        out = format_comparison(arr, verbose=True)
        assert "COMPARACAO: KADANE ITERATIVO vs RECURSIVO" in out
        assert "Soma Maxima (max_sum)" in out
        assert "[OK] SOMAS IDENTICAS" in out
        assert "Passo a Passo" in out


class TestCLIMain:
    """Testa invocação da CLI via main()."""

    def test_cli_valid_array(self, capsys):
        exit_code = main(["--array", "[-2, 1, -3, 4]"])
        assert exit_code == 0
        captured = capsys.readouterr()
        assert "COMPARACAO: KADANE ITERATIVO vs RECURSIVO" in captured.out
        assert "4" in captured.out

    def test_cli_verbose_flag(self, capsys):
        exit_code = main(["--array", "1, 2, -1, 3", "--verbose"])
        assert exit_code == 0
        captured = capsys.readouterr()
        assert "Passo a Passo" in captured.out

    def test_cli_empty_array_error(self, capsys):
        exit_code = main(["--array", "[]"])
        assert exit_code == 1
        captured = capsys.readouterr()
        assert "Erro de Entrada" in captured.err

    def test_cli_invalid_input_error(self, capsys):
        exit_code = main(["--array", "[1, invalid, 3]"])
        assert exit_code == 1
        captured = capsys.readouterr()
        assert "Erro de Entrada" in captured.err

    def test_cli_help(self):
        parser = build_parser()
        assert parser.prog == "kadane"

    def test_cli_interactive_repl_exemplo(self, monkeypatch, capsys):
        inputs = iter(["exemplo", "sair"])
        monkeypatch.setattr("builtins.input", lambda _: next(inputs))
        exit_code = main(["--interactive"])
        assert exit_code == 0
        captured = capsys.readouterr()
        assert "Bem-vindo ao Console Interativo" in captured.out
        assert "COMPARACAO: KADANE ITERATIVO vs RECURSIVO" in captured.out
        assert "Encerrando console interativo" in captured.out

    def test_cli_interactive_repl_error_and_empty(self, monkeypatch, capsys):
        inputs = iter(["", "not-a-number", "sair"])
        monkeypatch.setattr("builtins.input", lambda _: next(inputs))
        exit_code = main(["--interactive"])
        assert exit_code == 0
        captured = capsys.readouterr()
        assert "Erro:" in captured.out

    def test_cli_interactive_keyboard_interrupt(self, monkeypatch, capsys):
        def raise_keyboard_interrupt(_):
            raise KeyboardInterrupt()

        monkeypatch.setattr("builtins.input", raise_keyboard_interrupt)
        exit_code = main(["--interactive"])
        assert exit_code == 0
        captured = capsys.readouterr()
        assert "Encerrando console interativo" in captured.out
