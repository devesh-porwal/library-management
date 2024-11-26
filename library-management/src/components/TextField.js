import { TextField as Field } from "@mui/material"

export const TextField = ({value, setValue, placeholder}) => {
       return <Field
            placeholder={placeholder}
            variant="outlined"
            fullWidth
            value={value}
            onChange={(e)=> setValue(e?.target?.value)}
            sx={{
              height: '30px',
              '& input': {
                height: '30px',
                padding: '0 14px',
              },
            }}
          />

}
