from typing import Protocol
from domain.entities import Grid, Point


class FloodFillStrategy(Protocol):
    def fill(self, grid: Grid, start: Point, target_color: int) -> int:
        """
        Preenche a região conectada a partir de 'start' com 'target_color'.
        Retorna a quantidade total de células modificadas.
        """
        ...