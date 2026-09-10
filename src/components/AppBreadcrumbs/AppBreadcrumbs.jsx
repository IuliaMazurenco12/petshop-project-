import { Link as RouterLink } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs'; // MUI
import Link from '@mui/material/Link'; // MUI
import Typography from '@mui/material/Typography'; // MUI
import Box from '@mui/material/Box'; // MUI

// стили обычной ("непройденной") крошки — таблетка со светло-серой рамкой
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

// стили текущей страницы — та же таблетка, но с тёмной рамкой и жирным текстом
const currentCrumbSx = {
  ...crumbSx,
  borderColor: '#1a1a1a',
  color: '#1a1a1a',
  fontWeight: 600,
};

// короткая горизонтальная линия-разделитель между таблетками
const connectorSx = {
  display: 'inline-block',
  width: '12px',
  height: '1px',
  backgroundColor: '#e0e0e0',
};

// items — массив объектов вида { label: 'Текст', to: '/путь' }
// если у элемента нет "to" — значит это текущая страница, показываем просто текст
function AppBreadcrumbs({ items }) {
  return (
    <Breadcrumbs
      separator={<Box sx={connectorSx} />} // MUI
      sx={{ marginBottom: '32px', fontSize: '14px' }} // MUI
    >
      {items.map((item) => {
        const isCurrentPage = !item.to;

        if (isCurrentPage) {
          return (
            <Typography key={item.label} sx={currentCrumbSx}> {/* MUI */}
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
            sx={crumbSx} // MUI
          >
            {item.label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}

export default AppBreadcrumbs;