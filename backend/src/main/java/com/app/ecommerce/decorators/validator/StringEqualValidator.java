package com.app.ecommerce.decorators.validator;

import org.springframework.beans.BeanWrapperImpl;

import com.app.ecommerce.decorators.StringsEqual;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class StringEqualValidator implements ConstraintValidator<StringsEqual, Object> {
    private String field1;
    private String field2;

    @Override
    public void initialize(StringsEqual constraintAnnotation) {
        field1 = constraintAnnotation.field1();
        field2 = constraintAnnotation.field2();
    }

    @Override
    public boolean isValid(Object object, ConstraintValidatorContext context) {
        try {
            String value1 = (String) new BeanWrapperImpl(object).getPropertyValue(field1);
            String value2 = (String) new BeanWrapperImpl(object).getPropertyValue(field2);
            if (value1 != null && value1.equals(value2)) {
                return true;
            }
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                    "The values of " + field1 + " and " + field2 + " do not match.")
                    .addPropertyNode(field2).addConstraintViolation();
            return false;
        } catch (Exception e) {
            return false;
        }
    }

}
