import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import PriorityHighRoundedIcon from "@mui/icons-material/PriorityHighRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import InputAdornment from "@mui/material/InputAdornment";
import { Authentication, AuthenticationSchema } from "../model/schema.ts";
import { auth } from "../api/api.ts";
import { TOKEN_PROP } from "../lib/auxiliary.ts";
import { TextFieldGlass } from "shared/ui/textfield-glass.tsx";
import { MUTATION_KEYS, queryClient } from "shared/lib/react-query.ts";
import { asyncEventHandler } from "shared/lib/utils.ts";
import { checkAuthQuery } from "shared/api/api.ts";

export const AuthForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AuthenticationSchema),
    defaultValues: {
      username: "user150",
      password: "password",
    },
  });

  const { mutate } = useMutation({
    mutationKey: [MUTATION_KEYS.auth],
    mutationFn: (data: Authentication) => auth(data, TOKEN_PROP),
    onSuccess: () => {
      queryClient.setQueryData(checkAuthQuery.queryKey, true);

      setTimeout(() => {
        navigate("/", { unstable_viewTransition: true });
      }, 200);
    },
  });

  const onSubmit: SubmitHandler<Authentication> = (data) => {
    mutate(data);
  };

  return (
    <Paper
      component="form"
      variant="glass"
      autoComplete="off"
      onSubmit={asyncEventHandler(handleSubmit(onSubmit))}
      sx={{
        width: 320,
        mx: "auto",
        py: 6,
        px: 3,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <TextFieldGlass
        {...register("username")}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonRoundedIcon sx={{ color: "rgba(255, 255, 255, 0.7)", fontSize: 30 }} />
            </InputAdornment>
          ),
          endAdornment: errors.username ? (
            <InputAdornment position="end">
              <PriorityHighRoundedIcon color="error" />
            </InputAdornment>
          ) : null,
        }}
        placeholder="user1"
        error={Boolean(errors.username)}
        helperText={errors.username?.message}
      />

      <TextFieldGlass
        {...register("password")}
        type="password"
        placeholder="password"
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <VpnKeyRoundedIcon sx={{ color: "rgba(255, 255, 255, 0.7)", fontSize: 28 }} />
            </InputAdornment>
          ),
          endAdornment: errors.password ? (
            <InputAdornment position="end">
              <PriorityHighRoundedIcon color="error" />
            </InputAdornment>
          ) : null,
        }}
      />

      <Button type="submit" variant="glass" size="large" sx={{ mt: 2 }}>
        auth
      </Button>
    </Paper>
  );
};
