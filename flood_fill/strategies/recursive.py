from domain.entities import Grid, Point
from domain.interfaces import FloodFillStrategy


class RecursiveFloodFill(FloodFillStrategy):
    """Implementação recursiva baseada em Busca em Profundidade (DFS) na Call Stack."""

    def fill(self, grid: Grid, start: Point, target_color: int) -> int:
        original_color = grid.get_color(start)
        if original_color == target_color:
            return 0
        return self._dfs(grid, start, original_color, target_color)

    def _dfs(
        self,
        grid: Grid,
        current: Point,
        original_color: int,
        target_color: int,
    ) -> int:
        if not grid.is_within_bounds(current):
            return 0
        if grid.get_color(current) != original_color:
            return 0

        grid.set_color(current, target_color)
        modified_cells = 1

        for neighbor in current.orthogonal_neighbors():
            modified_cells += self._dfs(grid, neighbor, original_color, target_color)

        return modified_cells