from dataclasses import dataclass
from typing import List, Iterator


@dataclass(frozen=True)
class Point:
    row: int
    col: int

    def orthogonal_neighbors(self) -> Iterator["Point"]:
        """Gera os vizinhos ortogonais (Norte, Sul, Leste, Oeste)."""
        directions = ((-1, 0), (1, 0), (0, -1), (0, 1))
        for d_row, d_col in directions:
            yield Point(self.row + d_row, self.col + d_col)


class Grid:
    def __init__(self, matrix: List[List[int]]) -> None:
        if not matrix or not matrix[0]:
            raise ValueError("A matriz da grade não pode ser vazia.")
        self._matrix = [row[:] for row in matrix]
        self._height = len(self._matrix)
        self._width = len(self._matrix[0])

    @property
    def height(self) -> int:
        return self._height

    @property
    def width(self) -> int:
        return self._width

    def is_within_bounds(self, point: Point) -> bool:
        return 0 <= point.row < self._height and 0 <= point.col < self._width

    def get_color(self, point: Point) -> int:
        self._validate_bounds(point)
        return self._matrix[point.row][point.col]

    def set_color(self, point: Point, color: int) -> None:
        self._validate_bounds(point)
        self._matrix[point.row][point.col] = color

    def clone(self) -> "Grid":
        return Grid(self._matrix)

    def _validate_bounds(self, point: Point) -> None:
        if not self.is_within_bounds(point):
            raise IndexError(
                f"Ponto ({point.row}, {point.col}) fora dos limites "
                f"({self._height}x{self._width})."
            )