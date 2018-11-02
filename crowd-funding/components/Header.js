import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
  return (
    <Menu style={{ height: 55 }}>
      <Link route="/">
        <a className="item">ReadyGo!!</a>
      </Link>
    </Menu>
  );
};
