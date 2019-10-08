import React from 'react';
import Link, { LinkProps } from 'src/molecules/buttons/Link';

export const LinkCompact = (props: LinkProps) => <Link {...props} compact />;

export default React.memo(LinkCompact);