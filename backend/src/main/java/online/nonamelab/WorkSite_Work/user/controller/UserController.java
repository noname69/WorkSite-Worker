package online.nonamelab.WorkSite_Work.user.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import online.nonamelab.WorkSite_Work.exception.user.InvalidPasswordException;
import online.nonamelab.WorkSite_Work.user.dto.*;
import online.nonamelab.WorkSite_Work.user.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<MeResponse> me() {
        return ResponseEntity.ok(userService.getMe());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PublicUserResponse> getUserById(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(userService.getUserProfile(id));
    }

    @PatchMapping("/me")
    public ResponseEntity<MeResponse> updateMe(
            @Valid @RequestBody UpdateMeRequest request
    ) {
        return ResponseEntity.ok(userService.updateMe(request));
    }

    @PatchMapping("/me/password")
    public ResponseEntity<Void> changePassword(
            @Valid @RequestBody ChangePasswordRequest request
    ) {
        userService.changePassword(request);
        return ResponseEntity.noContent().build();
    }
}
