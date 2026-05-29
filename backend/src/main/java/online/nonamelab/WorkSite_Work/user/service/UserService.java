package online.nonamelab.WorkSite_Work.user.service;

import online.nonamelab.WorkSite_Work.user.dto.*;
import online.nonamelab.WorkSite_Work.user.model.UserRole;

import java.util.List;

public interface UserService {

    MeResponse getMe();

    PublicUserResponse getUserProfile(Long id);

    MeResponse updateMe(UpdateMeRequest request);

    void changePassword(ChangePasswordRequest request);

    AdminUserResponse create(CreateUserRequest request);

    AdminUserResponse getUserById(Long id);

    List<AdminUserResponse> getUsers();

    AdminUserResponse updateUserProfile(Long id, UpdateUserRequest request);

    void deleteUser(Long id);

    void restoreUser(Long id);

    List<UserOptionResponse> getUserOptions(UserRole role);
}
