import React, { useEffect, useState } from "react";
import "./RightColumn.styles.css";
import Clock from "react-live-clock";
import TopNavigation from "../TopNavigation/TopNavigation";
import { UilArrowUp } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilClock } from "@iconscout/react-unicons";
const RightColumn = () => {
	const [trending, setTrending] = useState("unfetched");

	useEffect(() => {
		var date = new Date();
		date.setDate(date.getDate() - 1);
		let dateNumber = date.getDate();
		let month = date.getMonth();
		if (dateNumber < 10) {
			dateNumber = `0${dateNumber}`;
		}
		if (month < 10) {
			month = `0${month}`;
		}
		fetch(
			`https://wikimedia.org/api/rest_v1/metrics/pageviews/top-per-country/IN/all-access/${date.getFullYear()}/${month}/${dateNumber}`
		)
			.then((response) => response.json())
			.then((data) => setTrending(data.items[0].articles.slice(0, 10)));
	}, []);
	const [modalOpened, setModalOpened] = useState(false);
	const d = new Date();
	let day = d.getDay();

	if (trending === "unfetched") {
		return <div>Loading....</div>;
	}

	return (
		<div className="RightColumn">
			{/* Side Navbar */}

			<TopNavigation />
			{/* TrendCard */}
			<div className="TrendCard">
				<div
					className="option"
					style={{ fontSize: "30px", fontWeight: "bold" }}
				>
					{
						[
							"Sunday",
							"Monday",
							"Tuesday",
							"Wednesday",
							"Thursday",
							"Friday",
							"Saturday",
						][day]
					}
				</div>
				<div className="option">
					<UilClock />
					<Clock
						style={{ fontSize: "20px", fontWeight: "bold" }}
						format={"HH:mm:ss a"}
						ticking={true}
						timezone={"Asia/Calcutta"}
					/>
				</div>
				<div
					className="option"
					style={{ fontSize: "20px", fontWeight: "bold" }}
				>
					<UilSchedule />
					{d.getDate()} - {d.getMonth()} - {d.getFullYear()}
				</div>
			</div>

			<div className="TrendCard">
				<h2>Trending in India!</h2>
				{trending.map((trend, index) => {
					return (
						<div
							style={{
								display: "flex",
								gap: "10px",
								justifyContent: "space-between",
								fontSize: "14px",
							}}
						>
							<div>{trend.article.replaceAll("_", " ")}</div>
							<div
								style={{
									display: "flex",
									gap: "5px",
									alignItems: "center",
									fontSize: "14px",
								}}
							>
								<UilArrowUp /> {trend.views_ceil / 1000}k
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default RightColumn;
