import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { QRCode } from 'react-qr-code';
import { useTranslation } from './LocalizationProvider';

const DeviceInviteDialog = ({ open, onClose, device }) => {
  const t = useTranslation();

  const inviteUrl = device
    ? `${window.location.origin}/download.html?id=${encodeURIComponent(device.uniqueId)}`
    : '';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = inviteUrl;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{t('deviceInvite')}</DialogTitle>
      <DialogContent>
        {device && (
          <>
            <Typography variant="subtitle1" align="center">
              {device.name}
            </Typography>
            <Typography variant="body2" align="center" color="text.secondary" gutterBottom>
              {device.uniqueId}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                bgcolor: 'white',
                p: 2,
                my: 2,
              }}
            >
              <QRCode value={inviteUrl} size={224} />
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ wordBreak: 'break-all' }}>
              {inviteUrl}
            </Typography>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('sharedCancel')}</Button>
        <Button onClick={handleCopy} variant="contained" disabled={!inviteUrl}>
          {t('sharedCopy')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeviceInviteDialog;
