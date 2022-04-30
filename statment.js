class Statement
{
    /**
     * @constructor
     * @param {int} startIndex
     * @param {int} endIndex
     * @param {String} statementType 
     */
     constructor(startIndex, endIndex, statementType)
     {
         this.statementType = statementType;
         this.endIndex = endIndex;
         this.startIndex = startIndex;
     }
}