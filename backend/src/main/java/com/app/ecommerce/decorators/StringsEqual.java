package com.app.ecommerce.decorators;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.app.ecommerce.decorators.validator.StringEqualValidator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Target({ ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = StringEqualValidator.class)
@Documented
public @interface StringsEqual {
  String field1();
  String field2();
  String message() default "Both values must matched";
  Class<?>[] groups() default {};
  Class<? extends Payload>[] payload() default {};
}
