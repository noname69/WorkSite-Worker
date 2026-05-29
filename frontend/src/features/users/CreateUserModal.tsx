import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { getApiErrorMessage } from "../../api/apiError";
import { useToastStore } from "../../store/toastStore";
import type { UserRole } from "../../types/auth";
import { useUserStore } from "./userStore";

type CreateUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type CreateUserForm = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: UserRole;
};

export default function CreateUserModal({
  isOpen,
  onClose,
}: CreateUserModalProps) {
  const createUser = useUserStore((state) => state.createUser);
  const showToast = useToastStore((state) => state.showToast);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserForm>({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
      role: "EMPLOYEE",
    },
  });

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: CreateUserForm) => {
    try {
      await createUser({
        ...data,
        phoneNumber: data.phoneNumber || null,
      });

      showToast("User created successfully", "success");
      handleClose();
    } catch (error) {
      showToast(getApiErrorMessage(error), "error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-[#e6e8ec] bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-[#e6e8ec] px-6 py-5">
          <div>
            <h3 className="text-xl font-extrabold">Create new user</h3>
            <p className="mt-1 text-sm text-[#6b7280]">
              Add a new employee, manager, admin or supplier.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="grid h-9 w-9 place-items-center rounded-lg text-[#6b7280] hover:bg-[#f2f4f7]"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold">First name</span>

              <input
                className="mt-2 w-full rounded-xl border border-[#e6e8ec] bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#e8ebf0]"
                {...register("firstName", {
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "First name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "First name must be less than 50 characters",
                  },
                })}
              />

              {errors.firstName && (
                <p className="mt-1 text-xs font-medium text-red-600">
                  {errors.firstName.message}
                </p>
              )}
            </label>

            <label className="block">
              <span className="text-sm font-semibold">Last name</span>

              <input
                className="mt-2 w-full rounded-xl border border-[#e6e8ec] bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#e8ebf0]"
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Last name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Last name must be less than 50 characters",
                  },
                })}
              />

              {errors.lastName && (
                <p className="mt-1 text-xs font-medium text-red-600">
                  {errors.lastName.message}
                </p>
              )}
            </label>

            <label className="block">
              <span className="text-sm font-semibold">Username</span>

              <input
                className="mt-2 w-full rounded-xl border border-[#e6e8ec] bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#e8ebf0]"
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Username must be less than 50 characters",
                  },
                })}
              />

              {errors.username && (
                <p className="mt-1 text-xs font-medium text-red-600">
                  {errors.username.message}
                </p>
              )}
            </label>

            <label className="block">
              <span className="text-sm font-semibold">Email</span>

              <input
                type="email"
                className="mt-2 w-full rounded-xl border border-[#e6e8ec] bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#e8ebf0]"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Email format is invalid",
                  },
                })}
              />

              {errors.email && (
                <p className="mt-1 text-xs font-medium text-red-600">
                  {errors.email.message}
                </p>
              )}
            </label>

            <label className="block">
              <span className="text-sm font-semibold">Phone number</span>

              <input
                className="mt-2 w-full rounded-xl border border-[#e6e8ec] bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#e8ebf0]"
                placeholder="+37060000000"
                {...register("phoneNumber")}
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold">Password</span>

              <input
                type="password"
                className="mt-2 w-full rounded-xl border border-[#e6e8ec] bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#e8ebf0]"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />

              {errors.password && (
                <p className="mt-1 text-xs font-medium text-red-600">
                  {errors.password.message}
                </p>
              )}
            </label>

            <label className="block md:col-span-2">
              <span className="text-sm font-semibold">Role</span>

              <select
                className="mt-2 w-full rounded-xl border border-[#e6e8ec] bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#e8ebf0]"
                {...register("role", {
                  required: "Role is required",
                })}
              >
                <option value="EMPLOYEE">Employee</option>
                <option value="MANAGER">Manager</option>
                <option value="SUPPLIER">Supplier</option>
                <option value="ADMIN">Admin</option>
              </select>

              {errors.role && (
                <p className="mt-1 text-xs font-medium text-red-600">
                  {errors.role.message}
                </p>
              )}
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-[#e6e8ec] bg-[#fbfbfc] px-6 py-5">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-[#e6e8ec] bg-white px-4 py-2 text-sm font-semibold hover:bg-[#f2f4f7]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-60"
            >
              {isSubmitting ? "Creating..." : "Create user"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}