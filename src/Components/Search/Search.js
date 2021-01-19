import React, { useState } from "react";
import {
  Button,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import { getTasks } from "../../store/actions";
import styles from "./search.module.css";

const statusOptions = [
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Done",
    value: "done",
  },
  {
    label: "Reset",
    value: "",
  },
];

const sortOptions = [
  {
    label: "A-Z",
    value: "a-z",
  },
  {
    label: "Z-A",
    value: "z-a",
  },
  {
    label: "Creation date oldest",
    value: "creation_date_oldest",
  },
  {
    label: "Creation date newest",
    value: "creation_date_newest",
  },
  {
    label: "Complation date oldest",
    value: "complation_date_oldest",
  },
  {
    label: "Complation date newest",
    value: "complation_date_newest",
  },
  {
    label: "Reset",
    value: "",
  },
];

const dateOptions = [
  {
    label: "Creation date oldest",
    value: "create_lte",
  },
  {
    label: "Creation date newest",
    value: "create_gte",
  },
  {
    label: "Complation date oldest",
    value: "complete_lte",
  },
  {
    label: "Complation date newest",
    value: "complete_gte",
  },
];

function Search(props) {
  const [status, setStatus] = useState({
    label: "",
    value: "",
  });
  const [sort, setSort] = useState({
    label: "",
    value: "",
  });
  const [dates, setDates] = useState({
    create_lte: null,
    create_gte: null,
    complete_lte: null,
    complete_gte: null,
  });
  const [search, setSearch] = useState("");

  const handleSubmit = () => {
    const data = {};

    const { create_lte, create_gte, complete_lte, complete_gte } = dates;
    if (create_lte) data.create_lte = create_lte.toLocaleDateString();
    if (create_gte) data.create_gte = create_gte.toLocaleDateString();
    if (complete_lte) data.complete_lte = complete_lte.toLocaleDateString();
    if (complete_gte) data.complete_gte = complete_gte.toLocaleDateString();
    if (search) data.search = search;
    if (sort) data.sort = sort.value;
    if (status) data.status = status.value;

    props.getTasks(data);
  };

  return (
    <Navbar bg="light" expand="lg" variant="info" className={styles.manNavbar}>
      <Navbar.Brand className={styles.navbarBrand}>Sort by</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown
            className={styles.navDropdown}
            title={status.value ? status.label : "Status"}
          >
            {statusOptions.map((item, index) => {
              return (
                <NavDropdown.Item
                  className={styles.navItem}
                  key={index}
                  onClick={() => setStatus(item)}
                  active={status.value === item.value}
                >
                  {item.label}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>
          <NavDropdown
            className={styles.navDropdown}
            title={sort.value ? sort.label : "Sort"}
          >
            {sortOptions.map((item, index) => {
              return (
                <NavDropdown.Item
                  className={styles.navItem}
                  key={index}
                  onClick={() => setSort(item)}
                  active={sort.value === item.value}
                >
                  {item.label}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>
          <NavDropdown className={styles.navDropdown} title="Date">
            {dateOptions.map((item, index) => {
              return (
                <div key={index} className={styles.dateDropdown}>
                  <span>{item.label} </span>
                  <DatePicker
                    selected={dates[item.value]}
                    onChange={(date) => {
                      setDates({
                        ...dates,
                        [item.value]: date,
                      });
                    }}
                  />
                </div>
              );
            })}
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <Button variant="outline-info" onClick={handleSubmit}>
            Search
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

const mapDispatchToProps = {
  getTasks,
};

export default connect(null, mapDispatchToProps)(Search);
