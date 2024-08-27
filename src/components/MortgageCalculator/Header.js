const Header = ({ handleClear }) => (
	<div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
		<h4 className="m-0 text-center text-md-left" style={{ fontSize: "22px", fontWeight: "600", color: "#333D4B" }}>
			Mortgage Calculator
		</h4>
		<button
			type="button"
			className="btn btn-link mt-3 mt-md-0 text-scondary"
			onClick={handleClear}
			style={{ fontSize: "14px", fontWeight: "600", color: "#9ABED5" }}
		>
			Clear All
		</button>
	</div>
);

export default Header;
