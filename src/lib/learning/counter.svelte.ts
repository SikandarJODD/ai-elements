import { getContext, setContext } from "svelte";

const COUNTER_KEY = Symbol("counter");
class Counter {
	value: number = $state(0);

	constructor(initialValue = 0) {
		this.value = initialValue;
	}

	increment() {
		this.value++;
	}
	decrement() {
		this.value--;
	}
}

type CounterType = {
	value: number;
	increment: () => void;
	decrement: () => void;
};
export function createCounter(initialValue: number = 0) {
	let counter = new Counter(initialValue);
	setContext(COUNTER_KEY, counter);
	return counter;
}

export function useCounter() {
	let counter = getContext<CounterType>(COUNTER_KEY);
	if (!counter) {
		throw new Error("useCounter must be added");
	}
	return counter;
}
