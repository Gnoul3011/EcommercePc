package com.app.ecommerce.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.ecommerce.DTO.OrderInformation.UpdateOrderInformation;
import com.app.ecommerce.models.OrderInformation;
import com.app.ecommerce.services.implement.OrderInformationImp;

import lombok.RequiredArgsConstructor;

@RestController // This means that this class is a Controller
@RequestMapping(value = "/orderinformation") // This means URL's start with /demo (after Application path)
@RequiredArgsConstructor
@CrossOrigin
public class OrderInformationController {

    @Autowired
    private OrderInformationImp orderInformationService;

    @GetMapping(value = "/")
    public @ResponseBody ResponseEntity<Object> getbyId(@RequestParam String id) {
        OrderInformation orderInformation = orderInformationService.getOrderInformationById(Integer.parseInt(id));
        return new ResponseEntity<Object>(orderInformation, HttpStatus.OK);
    }

    @PatchMapping(value = "/{id}/update")
    public ResponseEntity<OrderInformation> updateOrderInformation(@PathVariable String id,
            @RequestBody UpdateOrderInformation orderInformation) {
        return ResponseEntity
                .ok(orderInformationService.updateOrderInformation(Integer.parseInt(id), orderInformation));
    }
}
