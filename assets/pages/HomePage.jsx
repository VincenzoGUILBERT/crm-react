import React from "react";

const HomePage = (props) => {
	return (
		<ul className="list-group">
			<li className="list-group-item list-group-item-primary d-flex justify-content-between align-items-center">
				Cras justo odio
				<span className="badge bg-primary rounded-pill">14</span>
			</li>
			<li className="list-group-item list-group-item-secondary d-flex justify-content-between align-items-center">
				Dapibus ac facilisis in
				<span className="badge bg-primary rounded-pill">2</span>
			</li>
			<li className="list-group-item list-group-item-success d-flex justify-content-between align-items-center">
				Morbi leo risus
				<span className="badge bg-primary rounded-pill">1</span>
			</li>
			<li className="list-group-item list-group-item-info d-flex justify-content-between align-items-center">
				Cras justo odio
				<span className="badge bg-primary rounded-pill">5</span>
			</li>
			<li className="list-group-item list-group-item-warning d-flex justify-content-between align-items-center">
				Dapibus ac facilisis in
				<span className="badge bg-primary rounded-pill">4</span>
			</li>
			<li className="list-group-item list-group-item-danger d-flex justify-content-between align-items-center">
				Morbi leo risus
				<span className="badge bg-primary rounded-pill">9</span>
			</li>
			<li className="list-group-item list-group-item-light d-flex justify-content-between align-items-center">
				Morbi leo risus
				<span className="badge bg-primary rounded-pill">8</span>
			</li>
			<li className="list-group-item list-group-item-dark d-flex justify-content-between align-items-center">
				Morbi leo risus
				<span className="badge bg-primary rounded-pill">0</span>
			</li>
		</ul>
	);
};

export default HomePage;
