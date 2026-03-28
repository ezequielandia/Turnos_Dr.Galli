# Task: Extract FAQs and Images from Dr. Galli's Site

## Checklist
- [/] Extract all FAQ questions and answers verbatim. (In progress)
- [ ] Identify real images to download (doctor's portrait, backgrounds, etc.).
- [ ] Create `c:\Users\c5220118\Downloads\Desarrollos\fermin-galli\assets` folder.
- [ ] Download images using `Invoke-WebRequest`.
- [ ] Return the extracted FAQs and downloaded image filenames.

## Notes
- Current Page: https://sites.google.com/view/drgalli/preguntas-frecuentes
- FAQ extraction in progress:
  1. ¿Cuándo debo consultar a un cirujano? -> Consultá ante dolor persistente, hernias, bultos, problemas digestivos o indicación médica. También es útil para una segunda opinión.
  2. ¿Siempre es necesario operarse? -> No. Muchas patologías pueden tratarse sin cirugía. La indicación es individual y basada en cada caso.
  3. ¿Qué estudios necesito antes de operarme? -> Generalmente análisis de sangre, estudios cardiológicos e imágenes. Se ajusta según el paciente y la cirugía.
  4. ¿Debo hacer ayuno antes de la cirugía? -> Sí. Habitualmente 6–8 horas sin sólidos y 2 horas sin líquidos claros.
  5. ¿Qué tipo de cirugía se realiza? -> Puede ser laparoscópica (mínimamente invasiva) o abierta, según el caso.
  6. ¿Cuánto dura la recuperación? -> Depende del procedimiento. Puede ser desde pocos días hasta varias semanas.
  7. ¿Cuáles son los signos de alarma? -> Fiebre, dolor intenso, secreción en la herida o inflamación importante. Consultar de inmediato.
  8. ¿La cirugía es segura? -> Sí. Actualmente los procedimientos son seguros, con riesgos bajos. Se realizan evaluaciones preoperatorias para minimizar complicaciones.
  9. ¿Cuánto tiempo debo estar internado? -> Depende del tipo de cirugía. Muchas son ambulatorias, mientras que otras requieren internación breve.
  10. ¿Puedo hacer vida normal después de la cirugía? -> Sí. La mayoría de los pacientes retoma su vida habitual progresivamente, siguiendo indicaciones médicas.
  11. ¿Cuándo puedo volver a hacer ejercicio? -> Depende del procedimiento. En general, se recomienda retomar actividad física de forma progresiva luego de algunas semanas.
  12. ¿La cirugía deja cicatriz? -> Sí, pero en muchos casos son pequeñas, especialmente con técnicas laparoscópicas. Con el tiempo mejoran su aspecto.
  13. ¿Puedo manejar después de operarme? -> No inmediatamente. Se recomienda evitar conducir hasta estar sin dolor y sin efectos de medicación.
  14. ¿Qué pasa si tengo miedo a la cirugía? -> Es completamente normal. Se brinda información clara y acompañamiento para que el paciente se sienta seguro y contenido.
  15. ¿Necesito acompañante? -> Sí. Especialmente en cirugías ambulatorias, es importante contar con alguien que te acompañe al alta.
  16. ¿Qué debo llevar el día de la cirugía? -> Documentación, estudios previos, medicación habitual y ropa cómoda. Se brindan indicaciones específicas previamente.
  17. ¿Cuándo debo volver a control? -> Habitualmente entre los 7 y 10 días, o según indicación del cirujano.
- [x] Extract all FAQ questions and answers verbatim.
- [/] Identify real images to download (doctor's portrait, backgrounds, etc.). (Identified several URLs)
- [/] Create `c:\Users\c5220118\Downloads\Desarrollos\fermin-galli\assets` folder. (Next)
- [ ] Download images using `Invoke-WebRequest`.
- [ ] Return the extracted FAQs and downloaded image filenames.

## Identified Images (Tentative)
- **Portrait:** https://lh3.googleusercontent.com/sitesv/APaQ0SQIMi7VRyv1MduN-57B2YssPi_9Em5IElxKmW5Bw6Q3wPcN4CR9BHw5W1tb3gkLtbntmZb8MNE_8jPOjtgF3DcAnA7eU0oi-zzYfLwCB66TGmj-8qlBLdU6wEuEuuUuv1ZYEQfFt4VaD3xCzkanmSaNDdFzglMGdhuAuydvTqTXNJigiYLcG_8GR_51-R_ApelK_khqkQSqxAFlKxYdpK67zleJ4Q5r8nQSQ2s=w1280
- **Homepage Background:** https://lh3.googleusercontent.com/sitesv/APaQ0SREmP6KgujGOBIHH3MXDi3y-aZIebXRRwKifPwyMRvZG87KnWIO--fXXTV3RVqerZDADDrpfOZLMUAzLwlhnd5vfNIwEgmNEonqBPtE6nO42QsNSSQMdVGoCwJlAv3N_3fM0ew6H-3S6BCdRp_V_gxN6JvcLYDz9yWa3Ul2tbh_wi5f0t155qNb=w16383
- **Logo:** https://lh3.googleusercontent.com/sitesv/APaQ0SR4n0Vavc_QhSTfLfxeR5DR0mImO7EulPrnqWd2ARHPSYDmevLirdxuzDGnCEcIaQltZ1P2IWXSHA3Kq0njQ9lbQ3Hx_l-zqr4CIn7csdVyrA6_ra5bwZNS1ndrXpkhDqCJ2Vi2zlLd4Ts4rubisQNjxi6vwHmsh6OPf1NoslyNi9ZO_IgLy2Zs_J4=w16383
