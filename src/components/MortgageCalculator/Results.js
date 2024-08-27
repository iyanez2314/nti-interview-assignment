"use client";
import Image from "next/image";
const Results = ({ results, hasResults }) => (
	<>
		{hasResults ? (
			<>
				<div>
					<div className="result-header text-white text-left">Your results</div>
					<div className="result-details text-secondary ">
						Your results are shown below based on the information you provided. To adjust the results, edit the
						form and click "calculate repayments" again.
					</div>
				</div>

				<div className="result-box">
					<div className="result-summary font-weight-light">Your monthly repayments</div>
					<div className="result-amount">£{results.monthlyRepayment ?? "N/A"}</div>
					<div className="result-line"></div>

					<div className="result-summary text-secondary ">
						<div className="font-weight-light">Total you'll repay over the term:</div>
						<strong className="text-white total-repayment">£{results.totalRepayment ?? "N/A"}</strong>
					</div>
				</div>
			</>
		) : (
			<div className="image-container">
				<Image
					src="/images/illustration-empty.svg"
					alt="Empty state design"
					className="image-empty"
					width={100}
					height={100}
					layout="responsive"
				/>
				<div className="image-text text-center">
					<h2 className="font-size-22 text-white">Results Shown Here</h2>
					<p className=" result-summary">
						Complete the form and click "calculate repayments" to see your results to see what your monthly
						repayments would be.
					</p>
				</div>
			</div>
		)}
	</>
);

export default Results;
