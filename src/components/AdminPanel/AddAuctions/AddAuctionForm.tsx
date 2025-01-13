import {
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import styles from './AddAuctionForm.module.scss';
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import auctionService from '../../../services/auction.service';
import countriesService, { Country } from '../../../services/countries.service';
import dayjs from 'dayjs';

interface AddAuctionFormData {
  name: string;
  type: 'open' | 'closed';
  startDate: dayjs.Dayjs | null;
  endDate: dayjs.Dayjs | null;
  bidTimeout: number;
  country: number;
}

interface AddAuctionFormProps {
  onSuccess?: () => void;
}

const AddAuctionForm = ({ onSuccess }: AddAuctionFormProps) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const { control, handleSubmit, watch } = useForm<AddAuctionFormData>({
    defaultValues: {
      name: '',
      type: 'open',
      startDate: null,
      endDate: null,
      bidTimeout: 0,
      country: 0
    }
  });

  const auctionType = watch('type');

  useEffect(() => {
    const fetchCountries = async () => {
      const data = await countriesService.getCountries();
      setCountries(data);
    };
    fetchCountries();
  }, []);

  const onSubmit = async (data: AddAuctionFormData) => {
    try {
      await auctionService.createAuction({
        name: data.name,
        is_closed: data.type === 'closed' ? 1 : 0,
        bid_time: data.type === 'open' ? data.bidTimeout : 0,
        countries: [data.country],
        date_start: data.startDate?.toISOString() || '',
        ...(data.type === 'closed' && {
          date_final: data.endDate?.toISOString() || ''
        }),
      });
      onSuccess?.();
    } catch (error) {
      console.error('Error creating auction:', error);
    }
  };

  return (
    <Box className={styles.addAuctionForm}>
      <h2>Добавить аукцион</h2>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formRow}>
          <div className={styles.formField}>
            <div className={styles.label}>Название аукциона</div>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Название"
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              )}
            />
          </div>

          <div className={styles.formField}>
            <div className={styles.label}>Тип аукциона</div>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth size="small">
                  <Select {...field} displayEmpty>
                    <MenuItem value="open">Открытый</MenuItem>
                    <MenuItem value="closed">Закрытый</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </div>

          <div className={styles.formField}>
            <div className={styles.label}>Дата и время начала аукциона</div>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <DateTimePicker
                  {...field}
                  slotProps={{
                    textField: {
                      size: "small",
                      fullWidth: true,
                      placeholder: "Дата и время начала"
                    }
                  }}
                />
              )}
            />
          </div>

          {auctionType === 'open' && (
            <div className={styles.formField}>
              <div className={styles.label}>Время отсчета для ставок (сек)</div>
              <Controller
                name="bidTimeout"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    fullWidth
                    size="small"
                    placeholder="0"
                  />
                )}
              />
            </div>
          )}
          
          {auctionType === 'closed' && (
            <div className={styles.formField}>
              <div className={styles.label}>Дата и время конца аукциона</div>
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <DateTimePicker
                    {...field}
                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth: true,
                        placeholder: "Дата и время конца"
                      }
                    }}
                  />
                )}
              />
            </div>
          )}

          <div className={styles.formField}>
            <div className={styles.label}>Страна</div>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth size="small">
                  <Select {...field} displayEmpty>
                    <MenuItem value={0}>Выберите страну</MenuItem>
                    {countries.map((country) => (
                      <MenuItem key={country.id} value={country.id}>
                        {country.name_ru}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="contained"
          className={styles.submitButton}
          sx={{
            bgcolor: '#002D6E',
          }}
        >
          Добавить аукцион
        </Button>
      </form>
    </Box>
  );
};

export default AddAuctionForm;
