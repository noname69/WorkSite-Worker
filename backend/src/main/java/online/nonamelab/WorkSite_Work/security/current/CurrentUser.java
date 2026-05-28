package online.nonamelab.WorkSite_Work.security.current;

import lombok.RequiredArgsConstructor;
import online.nonamelab.WorkSite_Work.exception.auth.InvalidAuthenticationPrincipalException;
import online.nonamelab.WorkSite_Work.exception.auth.UnauthenticatedException;
import online.nonamelab.WorkSite_Work.exception.user.UserNotFoundException;
import online.nonamelab.WorkSite_Work.security.principal.UserPrincipal;
import online.nonamelab.WorkSite_Work.user.model.User;
import online.nonamelab.WorkSite_Work.user.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CurrentUser {

    private final UserRepository userRepository;

    public User get() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new UnauthenticatedException();
        }

        Object principal = authentication.getPrincipal();

        if (!(principal instanceof Jwt jwt)) {
            throw new InvalidAuthenticationPrincipalException();
        }

        String username = jwt.getSubject(); // IMPORTANT

        return userRepository.findByUsername(username)
                .orElseThrow(UserNotFoundException::new);
    }
}
