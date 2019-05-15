import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from "react-router";
import auth from '../../auth';
import './Navegacao.css';

class Navegacao extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }
    toggle = () => {
        this.setState(state => {
            state.isOpen = !this.state.isOpen;
            return state;
        });
    }
    handleLogout = () => {
        auth.signout();
        this.props.history.push("/login");
        window.location.reload();
    }
    toHome = () => {
        this.props.history.push("/")
    }
    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand>Avaliação Funcional</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink className="cursor-pointer" onClick={this.toHome}> Home</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Opções
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={this.handleLogout}>
                                        <FontAwesomeIcon icon={faSignOutAlt} />
                                        {" Sair"}
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}
export default withRouter(Navegacao);