REPORTER = list
MOCHA_OPTS = 
test:
	clear
	echo Starting test ******************************************
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	$(MOCHA_OPTS) \
	tests/*.js
	echo Ending test
test-w:
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER)  \
	--watch \
	tests/*.js