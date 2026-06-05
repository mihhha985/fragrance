"use client";
import { useState, useRef, useMemo } from "react";
import StartScreen from "./StartScreen";
import Question from "./Question";
import { gsap } from "gsap";
import { quizQuestions } from "@/types/quiz";
import type { Vote, FragranceType } from "@/types/quiz";
import { Result } from "./Result";

type QuizStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

function Quiz() {
	const [status, setStatus] = useState<QuizStatus>("COMPLETED");
	const [currentQuestion, setCurrentQuestion] = useState<number>(0);
	const [votes, setVotes] = useState<Vote[]>([]);
	const startScreenRef = useRef<HTMLDivElement>(null);

	const handleStart = () => {
		if (!startScreenRef.current) return;

		gsap.to(startScreenRef.current, {
			duration: 0.5,
			opacity: 0,
			y: -50,
			ease: "power2.in",
			onComplete: () => {
				setStatus("IN_PROGRESS");
			},
		});
	};

	const handleBack = () => {
		if (currentQuestion > 0) {
			setVotes((prev) => {
				const updated = [...prev];
				updated.pop();
				return updated;
			});

			setCurrentQuestion((prev) => prev - 1);
		} else {
			setStatus("NOT_STARTED");
		}
	};

	const addVote = (fragranceType: FragranceType) => {
		const vote: Vote = {
			Terra: fragranceType === "Terra" ? 1 : 0,
			Ignis: fragranceType === "Ignis" ? 1 : 0,
			Aqua: fragranceType === "Aqua" ? 1 : 0,
		};

		setVotes((prev) => {
			const updated = [...prev];
			updated[currentQuestion] = vote;
			return updated;
		});

		console.log(votes);
		//check is completed
		if (currentQuestion === quizQuestions.length - 1) {
			setStatus("COMPLETED");
		} else {
			setCurrentQuestion((prev) => prev + 1);
		}
	};

	const totalVote: Vote = useMemo(() => {
		return votes.reduce(
			(acc, vote) => ({
				Terra: acc.Terra + (vote.Terra || 0),
				Ignis: acc.Ignis + (vote.Ignis || 0),
				Aqua: acc.Aqua + (vote.Aqua || 0),
			}),
			{ Terra: 0, Ignis: 3, Aqua: 0 },
		);
	}, [votes]);

	const reset = () => {
		setVotes([]);
		setCurrentQuestion(0);
		setStatus("NOT_STARTED");
	};

	return (
		<>
			{status === "NOT_STARTED" && (
				<div ref={startScreenRef}>
					<StartScreen onStart={handleStart} />
				</div>
			)}

			{status === "IN_PROGRESS" && (
				<Question
					questionNumber={currentQuestion + 1}
					totalQuestions={quizQuestions.length}
					onAnswerSelected={addVote}
					onBack={handleBack}
				/>
			)}

			{status === "COMPLETED" && (
				<Result votes={totalVote} onRetakeQuiz={reset} />
			)}
		</>
	);
}

export default Quiz;
