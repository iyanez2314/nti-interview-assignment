"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import "./style.scss";
import Image from "next/image";
import Header from "./Header";
import MortgageForm from "./MortgageForm";
import Results from "./Results";

const MortgageCalculator = ({ ...props }) => {
	const formRef = useRef(null);
	const [formData, setFormData] = useState({
		loanAmount: "",
		mortgageTerm: "",
		interestRate: "",
		mortgageType: "Repayment",
	});
	const [errors, setErrors] = useState({});
	const [activeField, setActiveField] = useState(null);

	const validateForm = (data) => {
		const newErrors = {};
		if (!data.loanAmount) newErrors.loanAmount = "This field is required";
		else if (!/^\d+(\.\d{1,2})?$/.test(data.loanAmount.replace(/,/g, ""))) {
			newErrors.loanAmount = "Please enter a valid number";
		}
		if (!data.mortgageTerm) newErrors.mortgageTerm = "This field is required";
		if (!data.interestRate) newErrors.interestRate = "This field is required";
		return newErrors;
	};

	const handleSubmit = useCallback((e) => {
		e.preventDefault();
		const form = formRef.current;
		const data = new FormData(form);
		const dataObj = Object.fromEntries(data.entries());

		// Remove commas from loanAmount before validation
		dataObj.loanAmount = dataObj.loanAmount.replace(/,/g, "");

		const formErrors = validateForm(dataObj);
		if (Object.keys(formErrors).length > 0) {
			setErrors(formErrors);
			return;
		}

		setErrors({});

		setFormData({
			loanAmount: dataObj.loanAmount,
			mortgageTerm: dataObj.mortgageTerm,
			interestRate: dataObj.interestRate,
			mortgageType: dataObj.mortgageType,
		});
	}, []);

	const handleClear = useCallback(() => {
		formRef.current.reset();
		setFormData({
			loanAmount: "",
			mortgageTerm: "",
			interestRate: "",
			mortgageType: "Repayment",
		});
		setErrors({});
		setActiveField(null);
	}, []);

	const handleFocus = (field) => {
		setActiveField(field);
	};

	const handleBlur = () => {
		setActiveField(null);
	};

	const results = useMemo(() => {
		const { loanAmount, mortgageTerm, interestRate, mortgageType } = formData;
		const principal = parseFloat(loanAmount.replace(/,/g, ""));
		const termInMonths = parseFloat(mortgageTerm) * 12;
		const rate = parseFloat(interestRate) / 100 / 12;

		if (!principal || !termInMonths || !rate) {
			return { monthlyRepayment: null, totalRepayment: null };
		}

		const formatCurrency = (value) => {
			return value.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
		};

		if (mortgageType === "Repayment") {
			const monthlyRepayment = (principal * rate) / (1 - Math.pow(1 + rate, -termInMonths));
			const totalRepayment = monthlyRepayment * termInMonths;
			return {
				monthlyRepayment: formatCurrency(monthlyRepayment),
				totalRepayment: formatCurrency(totalRepayment),
			};
		} else if (mortgageType === "Interest Only") {
			const monthlyRepayment = principal * rate;
			const totalRepayment = principal + monthlyRepayment * termInMonths;
			return {
				monthlyRepayment: formatCurrency(monthlyRepayment),
				totalRepayment: formatCurrency(totalRepayment),
			};
		}

		return { monthlyRepayment: null, totalRepayment: null };
	}, [formData]);

	const hasResults = results.monthlyRepayment !== null && results.totalRepayment !== null;

	return (
		<div className="container mt-5">
			<div className="mortgage-calculator d-flex flex-column flex-lg-row align-items-stretch">
				<form className="form-section" ref={formRef} onSubmit={handleSubmit}>
					<div>
						<Header handleClear={handleClear} />
						<MortgageForm
							errors={errors}
							activeField={activeField}
							handleFocus={handleFocus}
							handleBlur={handleBlur}
						/>
					</div>

					<button type="submit" className="btn btn-calculate calculate-btn">
						<span className="mr-4">
							<Image src="/images/icon-calculator.svg" alt="Calculator" width={22} height={22} />
						</span>
						Calculate Repayments
					</button>
				</form>
				<div className="result-container">
					<Results results={results} hasResults={hasResults} />
				</div>
			</div>
		</div>
	);
};

export default MortgageCalculator;
