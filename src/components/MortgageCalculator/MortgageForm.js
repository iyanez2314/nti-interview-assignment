"use client";

const MortgageForm = ({ formRef, errors, activeField, handleFocus, handleBlur, handleSubmit }) => (
	<>
		<div className="mb-4">
			<label
				htmlFor="loan-amount"
				className="form-label"
				style={{ fontSize: "14px", fontWeight: "600", color: "#333D4B" }}
			>
				Mortgage Amount
			</label>
			<div
				className={`input-group ${errors.loanAmount ? "has-error" : ""} ${
					activeField === "loanAmount" ? "active" : ""
				}`}
			>
				<span className={`input-group-text ${activeField === "loanAmount" ? "active" : ""}`}>£</span>
				<input
					type="text"
					className={`form-control ${errors.loanAmount ? "is-invalid" : ""}`}
					id="loan-amount"
					name="loanAmount"
					placeholder="300000"
					pattern="^\d{1,3}(,\d{3})*(\.\d+)?$"
					onFocus={() => handleFocus("loanAmount")}
					onBlur={handleBlur}
					onChange={(e) => {
						const value = e.target.value.replace(/,/g, "");
						e.target.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
					}}
				/>
			</div>
			{errors.loanAmount && <div className="invalid-feedback d-block">{errors.loanAmount}</div>}
		</div>

		<div className="row">
			<div className="col-md-6 mb-4">
				<label htmlFor="mortgage-term" className="form-label">
					Mortgage Term
				</label>
				<div
					className={`input-group ${errors.mortgageTerm ? "has-error" : ""} ${
						activeField === "mortgageTerm" ? "active" : ""
					}`}
				>
					<input
						type="number"
						className={`form-control ${errors.mortgageTerm ? "is-invalid" : ""}`}
						id="mortgage-term"
						name="mortgageTerm"
						placeholder="25"
						onFocus={() => handleFocus("mortgageTerm")}
						onBlur={handleBlur}
					/>
					<span className={`input-group-text ${activeField === "mortgageTerm" ? "active" : ""}`}>years</span>
				</div>
				{errors.mortgageTerm && <div className="invalid-feedback d-block">{errors.mortgageTerm}</div>}
			</div>

			<div className="col-md-6 mb-4">
				<label htmlFor="interest-rate" className="form-label">
					Interest Rate
				</label>
				<div
					className={`input-group ${errors.interestRate ? "has-error" : ""} ${
						activeField === "interestRate" ? "active" : ""
					}`}
				>
					<input
						type="text"
						className={`form-control ${errors.interestRate ? "is-invalid" : ""}`}
						id="interest-rate"
						name="interestRate"
						placeholder="5.25"
						pattern="^\d*\.?\d*$"
						onFocus={() => handleFocus("interestRate")}
						onBlur={handleBlur}
					/>
					<span className={`input-group-text ${activeField === "interestRate" ? "active" : ""}`}>%</span>
				</div>
				{errors.interestRate && <div className="invalid-feedback d-block">{errors.interestRate}</div>}
			</div>
		</div>

		<div className="mb-4">
			<label className="form-label">Mortgage Type</label>
			<div className="form-check p-0 mb-3">
				<input
					className="form-check-input"
					type="radio"
					name="mortgageType"
					id="repayment"
					value="Repayment"
					defaultChecked
				/>
				<label htmlFor="repayment" className="form-check-label">
					Repayment
				</label>
			</div>
			<div className="form-check p-0">
				<input
					className="form-check-input"
					type="radio"
					name="mortgageType"
					id="interestOnly"
					value="Interest Only"
				/>
				<label htmlFor="interestOnly" className="form-check-label">
					Interest Only
				</label>
			</div>
		</div>
	</>
);

export default MortgageForm;
