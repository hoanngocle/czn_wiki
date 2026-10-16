/** Exact critically damped spring, with time in seconds (independent of refresh rate). */
export function advanceCardSpring(value: number, velocity: number, target: number, seconds: number, frequency: number) {
  const offset = value - target;
  const decay = Math.exp(-frequency * seconds);
  const impulse = (velocity + frequency * offset) * seconds;
  return {
    value: target + (offset + impulse) * decay,
    velocity: (velocity - frequency * impulse) * decay,
  };
}
