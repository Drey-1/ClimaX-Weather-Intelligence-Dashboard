import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import {
	NOTIFICATION_DURATION_MS,
	NotificationProvider,
	useNotification,
} from "./NotificationContext";

const TestComponent = () => {
	const { notification } = useNotification();

	return (
		<button type="button" onClick={() => notification("Hello")}>
			Click
		</button>
	);
};

describe("useNotification", () => {
	beforeEach(() => {
		vi.resetAllMocks();
		vi.useFakeTimers();
	});

	afterAll(() => {
		vi.useRealTimers();
	});

	it("must adds a notification with the given message when notification is called", async () => {
		render(
			<NotificationProvider>
				<TestComponent />
			</NotificationProvider>,
		);
		expect(screen.queryByText("Hello")).not.toBeInTheDocument();

		const button = screen.getByRole("button");
		fireEvent.click(button);

		expect(screen.getByText("Hello")).toBeInTheDocument();
	});

	it("must removes the notification after NOTIFICATION_DURATION_MS has passed", async () => {
		render(
			<NotificationProvider>
				<TestComponent />
			</NotificationProvider>,
		);

		const button = screen.getByRole("button");
		fireEvent.click(button);

		act(() => {
			vi.runAllTimers();
		});

		expect(screen.queryByText("Hello")).not.toBeInTheDocument();
	});

	it("must not remove the notification before NOTIFICATION_DURATION_MS has passed", async () => {
		render(
			<NotificationProvider>
				<TestComponent />
			</NotificationProvider>,
		);

		const button = screen.getByRole("button");
		fireEvent.click(button);

		act(() => {
			vi.advanceTimersByTime(NOTIFICATION_DURATION_MS - 1);
		});

		expect(screen.getByText("Hello")).toBeInTheDocument();
	});

	it("must supports multiple simuntaneous notifications", async () => {
		render(
			<NotificationProvider>
				<TestComponent />
			</NotificationProvider>,
		);

		const button = screen.getByRole("button");
		fireEvent.click(button);
		fireEvent.click(button);

		expect(screen.getAllByText("Hello")).toHaveLength(2);
	});

	it("must remove only the expired notification when multiple exist with different timings", async () => {
		render(
			<NotificationProvider>
				<TestComponent />
			</NotificationProvider>,
		);

		const button = screen.getByRole("button");
		fireEvent.click(button);
		act(() => {
			vi.advanceTimersByTime(NOTIFICATION_DURATION_MS - 1);
		});
		fireEvent.click(button);
		act(() => {
			vi.advanceTimersByTime(1);
		});

		expect(screen.getAllByText("Hello")).toHaveLength(1);
	});
});
