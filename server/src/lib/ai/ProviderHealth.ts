import type {
  AIProviderName,
} from "./types/provider.types.js";

interface ProviderHealthState {
  failures: number;

  successes: number;

  totalRequests: number;

  lastFailureAt?: number;

  lastSuccessAt?: number;

  cooldownUntil?: number;
}

class ProviderHealthManager {
  private readonly states =
    new Map<
      AIProviderName,
      ProviderHealthState
    >();

  /**
   * Minimum cooldown after a provider failure.
   */
  private readonly baseCooldownMs =
    2_000;

  /**
   * Maximum cooldown.
   */
  private readonly maxCooldownMs =
    60_000;

  private getState(
    provider: AIProviderName
  ): ProviderHealthState {
    const existing =
      this.states.get(provider);

    if (existing) {
      return existing;
    }

    const state: ProviderHealthState = {
      failures: 0,
      successes: 0,
      totalRequests: 0,
    };

    this.states.set(
      provider,
      state
    );

    return state;
  }

  canUse(
    provider: AIProviderName
  ): boolean {
    const state =
      this.getState(provider);

    if (
      !state.cooldownUntil
    ) {
      return true;
    }

    if (
      Date.now() >=
      state.cooldownUntil
    ) {
      state.cooldownUntil =
        undefined;

      return true;
    }

    return false;
  }

  markSuccess(
    provider: AIProviderName
  ): void {
    const state =
      this.getState(provider);

    state.totalRequests += 1;

    state.successes += 1;

    state.lastSuccessAt =
      Date.now();

    /**
     * Successful request restores
     * provider availability.
     */
    state.failures = 0;

    state.cooldownUntil =
      undefined;
  }

  markFailure(
    provider: AIProviderName
  ): void {
    const state =
      this.getState(provider);

    state.totalRequests += 1;

    state.failures += 1;

    state.lastFailureAt =
      Date.now();

    /**
     * Exponential backoff:
     *
     * failure 1 -> 2s
     * failure 2 -> 4s
     * failure 3 -> 8s
     * ...
     *
     * Maximum 60 seconds.
     */
    const exponent =
      Math.min(
        state.failures - 1,
        5
      );

    const cooldown =
      Math.min(
        this.baseCooldownMs *
          2 ** exponent,
        this.maxCooldownMs
      );

    state.cooldownUntil =
      Date.now() +
      cooldown;
  }

  getHealth(
    provider: AIProviderName
  ) {
    const state =
      this.getState(provider);

    const successRate =
      state.totalRequests === 0
        ? 100
        :
          (
            state.successes /
            state.totalRequests
          ) *
          100;

    return {
      provider,

      totalRequests:
        state.totalRequests,

      successes:
        state.successes,

      failures:
        state.failures,

      successRate,

      healthy:
        this.canUse(provider),

      lastFailureAt:
        state.lastFailureAt,

      lastSuccessAt:
        state.lastSuccessAt,

      cooldownUntil:
        state.cooldownUntil,

      failuresSinceSuccess:
        state.failures,
    };
  }

  getAllHealth() {
    return [
      ...this.states.keys(),
    ].map(
      (provider) =>
        this.getHealth(
          provider
        )
    );
  }

  reset(
    provider?: AIProviderName
  ): void {
    if (provider) {
      this.states.delete(
        provider
      );

      return;
    }

    this.states.clear();
  }
}

export default new ProviderHealthManager();