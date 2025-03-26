const TYPES = {
    // controllers
    PaymentController: Symbol.for('PaymentController'),

    // use cases
    CreatePaymentUseCase: Symbol.for('CreatePaymentUseCase'),

    // repositories  
    PaymentsRepository: Symbol.for('PaymentsRepository'),    

};
  
export { TYPES };