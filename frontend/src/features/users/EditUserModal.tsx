import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { getApiErrorMessage } from "../../api/apiError";
import { useToastStore } from "../../store/toastStore";
import type { UserRole } from "../../types/auth";
import { useAuthStore } from "../auth/authStore";
import { useUserStore } from "./userStore";
import type { UpdateUserRequest, UserResponse } from "./userTypes";

type EditUserModalProps = {
  isOpen: boolean;
  user: UserResponse | null;
  onClose: () => void;
};

type EditUserForm = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
};

export default function EditUserModal({ isOpen, user, onClose }: EditUserModalProps) {
  const currentUser = useAuthStore((state) => state.user);
  const updateUser = useUserStore((state) => state.updateUser);
  const showToast = useToastStore((state) => state.showToast);

  const canEditRole = currentUser?.role === "ADMIN" || currentUser?.role === "MANAGER";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditUserForm>({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phoneNumber: "",
      role: "EMPLOYEE",
    },
  });

  useEffect(() => {
    if (!user) {
      return;
    }

    reset({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber ?? "",
      role: user.role,
    });
  }, [user, reset]);

  if (!isOpen || !user) {
    return null;
  }

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: EditUserForm) => {
    try {
      const request: UpdateUserRequest = {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        phoneNumber: data.phoneNumber || null,
      };

      if (canEditRole) {
        request.role = data.role;
      }

      await updateUser(user.id, request);

      showToast("User updated successfully", "success");
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
            <h3 className="text-xl font-extrabold">Edit user</h3>
            <p className="mt-1 text-sm text-[#6b7280]">
              Update user profile information.
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
              <span className="text-sm font-semibold">Role</span>

              <select
                disabled={!canEditRole}
                className="mt-2 w-full rounded-xl border border-[#e6e8ec] bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#e8ebf0] disabled:bg-[#f2f4f7] disabled:text-[#6b7280]"
                {...register("role", {
                  required: "Role is required",
                })}
              >
                <option value="EMPLOYEE">Employee</option>
                <option value="MANAGER">Manager</option>
                <option value="SUPPLIER">Supplier</option>
                <option value="ADMIN">Admin</option>
              </select>

              {!canEditRole && (
                <p className="mt-1 text-xs text-[#6b7280]">
                  Only admins can change user role.
                </p>
              )}

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
              {isSubmitting ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
