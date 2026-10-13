from collections import deque
from domain.entities import Grid, Point
from domain.interfaces import FloodFillStrategy


class IterativeFloodFill(FloodFillStrategy):
    """Implementação iterativa baseada em Busca em Largura (BFS) no Heap."""

    def fill(self, grid: Grid, start: Point, target_color: int) -> int:
        original_color = grid.get_color(start)
        if original_color == target_color:
            return 0

        queue: deque[Point] = deque([start])
        grid.set_color(start, target_color)
        modified_cells = 1

        while queue:
            current = queue.popleft()
            for neighbor in current.orthogonal_neighbors():
                if self._should_fill(grid, neighbor, original_color):
                    grid.set_color(neighbor, target_color)
                    queue.append(neighbor)
                    modified_cells += 1

        return modified_cells

    @staticmethod
    def _should_fill(grid: Grid, point: Point, original_color: int) -> bool:
        return grid.is_within_bounds(point) and grid.get_color(point) == original_color