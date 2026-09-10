import { Link as RouterLink } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const crumbSx = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '8px 16px',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  color: '#9a9a9a',
  whiteSpace: 'nowrap',
  textDecoration: 'none',
  transition: 'border-color 0.15s ease, color 0.15s ease',
  '&:hover': {
    borderColor: '#b0b0b0',
    color: '#666',
  },
};

const currentCrumbSx = {
  ...crumbSx,
  borderColor: '#1a1a1a',
  color: '#1a1a1a',
  fontWeight: 600,
};

const connectorSx = {
  display: 'inline-block',
  width: '12px',
  height: '1px',
  backgroundColor: '#e0e0e0',
};

function AppBreadcrumbs({ items }) {
  return (
    <Breadcrumbs
      separator={<Box sx={connectorSx} />}
      sx={{ marginBottom: '32px', fontSize: '14px' }}
    >
      {items.map((item) => {
        const isCurrentPage = !item.to;

        if (isCurrentPage) {
          return (
            <Typography key={item.label} sx={currentCrumbSx}>
              {item.label}
            </Typography>
          );
        }

        return (
          <Link
            key={item.label}
            component={RouterLink}
            to={item.to}
            underline="none"
            sx={crumbSx}
          >
            {item.label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}

export default AppBreadcrumbs;