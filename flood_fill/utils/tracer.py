import time
import tracemalloc
from dataclasses import dataclass
from typing import Callable, Generic, Optional, TypeVar

T = TypeVar("T")


@dataclass(frozen=True)
class ExecutionProfile(Generic[T]):
    result: Optional[T]
    elapsed_ms: float
    peak_memory_kb: float
    error: Optional[Exception] = None


class PerformanceTracer:
    """Monitor de execução para tempo de CPU (perf_counter) e memória (tracemalloc)."""

    @staticmethod
    def trace(action: Callable[[], T]) -> ExecutionProfile[T]:
        tracemalloc.start()
        start_time = time.perf_counter()
        try:
            result = action()
            elapsed_ms = (time.perf_counter() - start_time) * 1000
            _, peak_bytes = tracemalloc.get_traced_memory()
            return ExecutionProfile(
                result=result,
                elapsed_ms=elapsed_ms,
                peak_memory_kb=peak_bytes / 1024,
            )
        except Exception as error:
            elapsed_ms = (time.perf_counter() - start_time) * 1000
            _, peak_bytes = tracemalloc.get_traced_memory()
            return ExecutionProfile(
                result=None,
                elapsed_ms=elapsed_ms,
                peak_memory_kb=peak_bytes / 1024,
                error=error,
            )
        finally:
            tracemalloc.stop()