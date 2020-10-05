import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const ClassRow = (idx, data, state, handleChange) => (
	<Form.Row>
		<Form.Group as={Col} controlId="Class" key={"class" + idx}>
			<Form.Label>Class</Form.Label>
			<Form.Control
				as="select"
				defaultValue={(data && data.class) ? data.class : ""}
				values={state.classSections[idx] && state.classSections[idx].class}
				onChange={(e) => handleChange(e, "class", idx)}
			>
				{[...Array(12).keys()]
					.map((i) => i + 1)
					.map((i) => (
						<option>{i}</option>
					))}
			</Form.Control>
		</Form.Group>
		<Form.Group
			as={Col}
			controlId="Section"
			values={state.classSections[idx] && state.classSections[idx].section}
			onChange={(e) => handleChange(e, "section", idx)}
		>
			<Form.Label>Section</Form.Label>
			<Form.Control as="select" defaultValue={data ? data.section : ""}>
				<option>A</option>
				<option>B</option>
				<option>C</option>
				<option>D</option>
				<option>E</option>
				<option>F</option>
			</Form.Control>
		</Form.Group>
		<button
			type="button"
			class="close"
			aria-label="Close"
			style={{ paddingTop: "0.5rem", paddingLeft: "0.5rem" }}
		>
			<span aria-hidden="true">&times;</span>
		</button>
	</Form.Row>
);

class TeacherModalFields extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			classList: [],
			name: "",
			teacherId: "",
			classSections: [],
		};
	}

	componentDidMount() {
		if (!this.props.isEditing)
			this.setState({
				classList: [
					ClassRow(0, this.props.data, this.state, this.handleClass),
				],
			});
	}

	handleClick = (e) => {
		this.setState({
			classList: this.state.classList.concat(
				ClassRow(
					this.state.classList.length,
					this.props.data,
					this.state,
					this.handleClass
				)
			),
			classSections: [
				this.state.classSections.concat({ class: "", section: "" }),
			],
		});
	};

	handleChange = (e, key) => {
		this.setState({ [key]: e.target.value });
	};

	handleClass = (e, key, idx) => {
		const items = this.state.classSections;

		this.setState({
			classSections: [
				...items.slice(0, idx),
				{
					...items[idx],
					[key]: e.target.value,
				},
				...items.slice(idx + 1),
			],
		});
	};

	render() {
		const data = this.props.data;
		return (
			<React.Fragment>
				<Form.Group controlId="Name">
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Name"
						defaultValue={data ? data.name : ""}
						values={this.state.name}
						onChange={this.handleChange}
					/>
				</Form.Group>
				<Form.Group controlId="TeacherID">
					<Form.Label>Teacher ID</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Teacher ID"
						defaultValue={data ? data.teacher_id : ""}
						values={this.state.teacherId}
						onChange={this.handleChange}
					/>
				</Form.Group>
				{this.props.isEditing ? (
					<React.Fragment>
						{data.class.map((c, idx) => (
							<Form.Row>
								<Form.Group as={Col} controlId="Class">
									<Form.Label>Class</Form.Label>
									<Form.Control as="select" defaultValue={c}>
										{[...Array(12).keys()]
											.map((i) => i + 1)
											.map((i) => (
												<option>{i}</option>
											))}
									</Form.Control>
								</Form.Group>
								<Form.Group as={Col} controlId="Section">
									<Form.Label>Section</Form.Label>
									<Form.Control
										as="select"
										defaultValue={data.section[idx]}
									>
										<option>A</option>
										<option>B</option>
										<option>C</option>
										<option>D</option>
										<option>E</option>
										<option>F</option>
									</Form.Control>
								</Form.Group>
							</Form.Row>
						))}
						{this.state.classList}
					</React.Fragment>
				) : (
					this.state.classList
				)}
				<Button
					variant="outline-primary"
					block
					onClick={this.handleClick}
				>
					Add Class and Section
				</Button>
			</React.Fragment>
		);
	}
}

export default TeacherModalFields;
