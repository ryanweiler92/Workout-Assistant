import React, { useState } from 'react';
import { Container, Row, Col, Modal, Card, Button, Collapse } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';

import { Drawer, } from 'react-bootstrap-drawer';

const Sidebar = (props) => {
	const [open, setOpen] = useState(true);

	const handleToggle = () => setOpen(!open);

	return (
		<Drawer { ...props } className="sidebar">
			<Collapse in={ open }>
				<Drawer.Overflow>
					<Drawer.ToC>
						<Drawer.Header href="/">Routine</Drawer.Header>

						<Drawer.Nav>
							<Drawer.Item href="/settings">Settings</Drawer.Item>
						</Drawer.Nav>
					</Drawer.ToC>
				</Drawer.Overflow>
			</Collapse>
		</Drawer>
	);
};

export default Sidebar