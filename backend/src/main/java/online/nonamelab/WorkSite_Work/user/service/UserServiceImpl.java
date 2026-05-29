package online.nonamelab.WorkSite_Work.user.service;

import lombok.RequiredArgsConstructor;
import online.nonamelab.WorkSite_Work.exception.user.*;
import online.nonamelab.WorkSite_Work.security.current.CurrentUser;
import online.nonamelab.WorkSite_Work.user.dto.*;

import online.nonamelab.WorkSite_Work.user.mapper.UserMapper;
import online.nonamelab.WorkSite_Work.user.model.User;
import online.nonamelab.WorkSite_Work.user.model.UserRole;
import online.nonamelab.WorkSite_Work.user.model.UserStatus;
import online.nonamelab.WorkSite_Work.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    //    private final CurrentUserService currentUserService;
    private final CurrentUser currentUser;

    // =========================
    // CREATE USER (ADMIN ONLY)
    // =========================
    @Override
    public AdminUserResponse create(CreateUserRequest request) {
        if (userRepository.existsByUsername(request.username())) {
            throw new UsernameAlreadyExistsException();
        }

        if (userRepository.existsByEmail(request.email())) {
            throw new EmailAlreadyExistsException();
        }

        User user = userMapper.toEntity(request);

        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setStatus(UserStatus.ACTIVE);

        return userMapper.toAdminResponse(userRepository.save(user));
    }

    // =========================
    // CURRENT USER (/me)
    // =========================
    @Override
    public MeResponse getMe() {
        User user = currentUser.get();
        return userMapper.toMeResponse(user);
    }

    // =========================
    // PUBLIC PROFILE VIEW
    // =========================
    @Override
    public PublicUserResponse getUserProfile(Long id) {
        User current = currentUser.get();

        User user = userRepository.findByIdAndDeletedAtIsNull(id)
                .orElseThrow(UserNotFoundException::new
                );

        // 🚨 SECURITY RULE: employees cannot see admins
        if (current.getRole() != UserRole.ADMIN &&
                user.getRole() == UserRole.ADMIN) {
            throw new UserNotFoundException();
        }

        return userMapper.toPublicResponse(user);
    }

    // =========================
    // GET BY ID (ADMIN)
    // =========================
    @Override
    public AdminUserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(UserNotFoundException::new
                );

        return userMapper.toAdminResponse(user);
    }

    // =========================
    // GET ALL(ADMIN)
    // =========================
    @Override
    public List<AdminUserResponse> getUsers() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::toAdminResponse)
                .toList();
    }

    @Override
    public AdminUserResponse updateUserProfile(Long id, UpdateUserRequest request) {
        User user = userRepository.findByIdAndDeletedAtIsNull(id)
                .orElseThrow(UserNotFoundException::new
                );

        userMapper.updateUserFromDto(request, user);

        return userMapper.toAdminResponse(userRepository.save(user));
    }

    // =========================
    // DELETE(SOFT) USER (ADMIN)
    // =========================
    @Override
    public void deleteUser(Long id) {
        User current = currentUser.get();

        if (current.getId().equals(id)) {
            throw new SelfActionNotAllowedException("delete");
        }

        User user = userRepository.findByIdAndDeletedAtIsNull(id)
                .orElseThrow(UserNotFoundException::new
                );

        user.setDeletedAt(LocalDateTime.now());
        user.setStatus(UserStatus.INACTIVE);

        userRepository.save(user);
    }

    // =========================
    // RESTORE USER (ADMIN)
    // =========================
    @Override
    public void restoreUser(Long id) {

        User current = currentUser.get();

        // prevent self-restore logic is usually not needed, but keep consistency
        if (current.getId().equals(id)) {
            throw new SelfActionNotAllowedException("restore");
        }

        User user = userRepository.findById(id)
                .orElseThrow(UserNotFoundException::new
                );

        if (user.getDeletedAt() == null) {
            throw new InvalidUserStateException("User is not deleted");
        }

        if (user.getStatus() == UserStatus.ACTIVE) {
            throw new InvalidUserStateException("User already active");
        }

        user.setDeletedAt(null);
        user.setUpdatedAt(LocalDateTime.now());
        user.setStatus(UserStatus.ACTIVE);

        userRepository.save(user);
    }


    @Override
    public MeResponse updateMe(UpdateMeRequest request) {
        User user = currentUser.get();

        userMapper.updateMeFromDto(request, user);

        return userMapper.toMeResponse(userRepository.save(user));
    }

    @Override
    public void changePassword(ChangePasswordRequest request) {
        User user = currentUser.get();

        if (!passwordEncoder.matches(request.oldPassword(), user.getPasswordHash())) {
            throw new InvalidPasswordException();
        }

        user.setPasswordHash(
                passwordEncoder.encode(request.newPassword())
        );

        userRepository.save(user);
    }

    @Override
    public List<UserOptionResponse> getUserOptions(UserRole role) {
        return userRepository
                .findByRoleAndDeletedAtIsNullOrderByFirstNameAscLastNameAsc(role)
                .stream()
                .map(userMapper::toOptionResponse)
                .toList();
    }
}
