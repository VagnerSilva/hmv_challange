import { toHaveNoViolations } from "jest-axe"
import "jest-preset-angular/setup-jest"

expect.extend(toHaveNoViolations)
